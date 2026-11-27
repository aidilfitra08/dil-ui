import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import type { SliderProps } from "./Slider.types";
import { cn } from "../../../lib/utils";

const DEFAULT_VALUE = [0];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeValues(
  values: number[] | undefined,
  min: number,
  max: number,
  step: number,
  minSteps: number,
) {
  const source = values?.length ? values : DEFAULT_VALUE;
  const range = Math.max(0, max - min);
  const normalizedStep = Math.min(step, range || step);
  const gap = Math.max(0, minSteps) * normalizedStep;
  const sorted = source
    .map((value) => (Number.isFinite(value) ? value : min))
    .map(
      (value) =>
        min +
        Math.round((clamp(value, min, max) - min) / normalizedStep) *
          normalizedStep,
    )
    .map((value) => clamp(value, min, max))
    .sort((a, b) => a - b);

  return sorted.map((value, index) => {
    const lower = index === 0 ? min : sorted[index - 1] + gap;
    return clamp(Math.max(value, lower), min, max);
  });
}

export function Slider({
  value,
  defaultValue,
  min: minProp = 0,
  max: maxProp = 100,
  step: stepProp = 1,
  minStepsBetweenThumbs = 0,
  disabled = false,
  orientation = "horizontal",
  inverted = false,
  onValueChange,
  onValueCommit,
  className,
  name,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SliderProps) {
  const min = Number.isFinite(minProp) ? minProp : 0;
  const max = Number.isFinite(maxProp) ? Math.max(min, maxProp) : min;
  const step = Number.isFinite(stepProp) && stepProp > 0 ? stepProp : 1;
  const values = useMemo(
    () =>
      normalizeValues(
        value ?? defaultValue,
        min,
        max,
        step,
        minStepsBetweenThumbs,
      ),
    [defaultValue, max, min, minStepsBetweenThumbs, step, value],
  );
  const [uncontrolled, setUncontrolled] = useState({ initial: values, current: values });
  const defaultsChanged = uncontrolled.initial !== values;
  if (value === undefined && defaultsChanged) {
    setUncontrolled({ initial: values, current: values });
  }
  const currentValues = value === undefined && !defaultsChanged
    ? uncontrolled.current
    : values;
  const rootRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<number | null>(null);
  const lastCommittedRef = useRef(currentValues);
  const pendingValuesRef = useRef<number[] | null>(null);

  useEffect(() => {
    if (value !== undefined) lastCommittedRef.current = currentValues;
  }, [currentValues, value]);

  const updateValues = useCallback(
    (nextValues: number[], commit = false) => {
      const next = normalizeValues(
        nextValues,
        min,
        max,
        step,
        minStepsBetweenThumbs,
      );
      const previousValues = pendingValuesRef.current ?? currentValues;
      const changed =
        previousValues.length !== next.length ||
        previousValues.some((item, index) => item !== next[index]);
      if (changed) {
        if (value === undefined) setUncontrolled({ initial: values, current: next });
        onValueChange?.(next);
      }
      pendingValuesRef.current = commit ? null : next;
      if (commit) {
        if (
          changed ||
          lastCommittedRef.current.some(
            (item, index) => item !== next[index],
          ) ||
          lastCommittedRef.current.length !== next.length
        ) {
          onValueCommit?.(next);
        }
        lastCommittedRef.current = next;
      }
    },
    [
      currentValues,
      max,
      min,
      minStepsBetweenThumbs,
      onValueChange,
      onValueCommit,
      step,
      value,
      values,
    ],
  );

  const valueFromPointer = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const bounds = rootRef.current?.getBoundingClientRect();
      if (!bounds) return min;
      const position =
        orientation === "horizontal"
          ? (event.clientX - bounds.left) / bounds.width
          : 1 - (event.clientY - bounds.top) / bounds.height;
      const logicalPosition = inverted ? 1 - position : position;
      return min + clamp(logicalPosition, 0, 1) * (max - min);
    },
    [inverted, max, min, orientation],
  );

  const selectThumb = (rawValue: number) => {
    const distances = currentValues.map((item) => Math.abs(item - rawValue));
    return distances.reduce(
      (closest, distance, index) =>
        distance < distances[closest] ? index : closest,
      0,
    );
  };

  const updateThumbValue = (index: number, rawValue: number) => {
    const gap = Math.max(0, minStepsBetweenThumbs) * Math.min(step, max - min);
    const lower = index === 0 ? min : currentValues[index - 1] + gap;
    const upper =
      index === currentValues.length - 1 ? max : currentValues[index + 1] - gap;
    if (lower > upper) return;

    updateValues(
      currentValues.map((item, itemIndex) =>
        itemIndex === index ? clamp(rawValue, lower, upper) : item,
      ),
    );
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>,
    thumbIndex?: number,
  ) => {
    if (disabled) return;
    event.preventDefault();
    rootRef.current?.setPointerCapture(event.pointerId);
    const rawValue = valueFromPointer(event);
    const index = thumbIndex ?? selectThumb(rawValue);
    activeThumbRef.current = index;
    updateThumbValue(index, rawValue);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (activeThumbRef.current === null || disabled) return;
    const index = activeThumbRef.current;
    updateThumbValue(index, valueFromPointer(event));
  };

  const handlePointerUp = () => {
    if (activeThumbRef.current !== null) {
      updateValues(pendingValuesRef.current ?? currentValues, true);
      activeThumbRef.current = null;
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (disabled) return;
    const direction =
      orientation === "horizontal"
        ? event.key === "ArrowRight"
          ? 1
          : event.key === "ArrowLeft"
            ? -1
            : 0
        : event.key === "ArrowUp"
          ? 1
          : event.key === "ArrowDown"
            ? -1
            : 0;
    const adjustedDirection = inverted ? -direction : direction;
    const pageStep = (max - min) / 10;
    const delta = adjustedDirection * step;
    let nextValue = currentValues[index];
    if (direction !== 0) nextValue += delta;
    else if (event.key === "PageUp")
      nextValue += inverted ? -pageStep : pageStep;
    else if (event.key === "PageDown")
      nextValue -= inverted ? -pageStep : pageStep;
    else if (event.key === "Home") nextValue = inverted ? max : min;
    else if (event.key === "End") nextValue = inverted ? min : max;
    else return;
    event.preventDefault();
    updateThumbValue(index, nextValue);
  };

  const positions = currentValues.map((item) =>
    max === min ? 0 : ((item - min) / (max - min)) * 100,
  );
  const rangeStart = positions[0] ?? 0;
  const rangeEnd = positions[positions.length - 1] ?? 0;
  const orientationClasses =
    orientation === "horizontal" ? "h-5 w-full" : "h-48 w-5";
  const trackClasses =
    orientation === "horizontal"
      ? "left-0 top-1/2 h-1 w-full -translate-y-1/2"
      : "bottom-0 left-1/2 h-full w-1 -translate-x-1/2";

  return (
    <div
      ref={rootRef}
      id={id}
      role="group"
      aria-disabled={disabled || undefined}
      className={cn(
        "relative touch-none select-none",
        orientationClasses,
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerDown={(event) => handlePointerDown(event)}
    >
      <div
        className={cn(
          "absolute rounded-full bg-(--dil-color-muted,#e5e7eb)",
          trackClasses,
        )}
      >
        <div
          className={cn(
            "absolute rounded-full bg-(--dil-color-primary,#2563eb)",
            orientation === "horizontal"
              ? "top-0 h-full"
              : "bottom-0 left-0 w-full",
          )}
          style={
            orientation === "horizontal"
              ? { left: `${rangeStart}%`, width: `${rangeEnd - rangeStart}%` }
              : {
                  bottom: `${rangeStart}%`,
                  height: `${rangeEnd - rangeStart}%`,
                }
          }
        />
      </div>
      {currentValues.map((item, index) => (
        <div
          key={index}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={item}
          aria-disabled={disabled || undefined}
          className={cn(
            "absolute size-4 cursor-grab rounded-full border-2 border-(--dil-color-primary,#2563eb) bg-(--dil-color-surface,#ffffff) shadow-sm outline-none transition-shadow",
            "focus-visible:ring-2 focus-visible:ring-(--dil-color-primary,#2563eb) focus-visible:ring-offset-2",
            "active:cursor-grabbing active:shadow-md",
            orientation === "horizontal"
              ? "top-1/2 -translate-x-1/2 -translate-y-1/2"
              : "left-1/2 -translate-x-1/2 translate-y-1/2",
            disabled && "cursor-not-allowed",
          )}
          style={
            orientation === "horizontal"
              ? {
                  left: `${inverted ? 100 - positions[index] : positions[index]}%`,
                }
              : {
                  bottom: `${inverted ? 100 - positions[index] : positions[index]}%`,
                }
          }
          onPointerDown={(event) => handlePointerDown(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {name ? (
            <input type="hidden" name={name} value={item} readOnly />
          ) : null}
        </div>
      ))}
    </div>
  );
}
