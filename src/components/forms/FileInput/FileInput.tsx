import { useMergeRefs } from "@floating-ui/react";
import { forwardRef, useEffect, useId, useRef, useState } from "react";

import type { FileInputProps } from "./FileInput.types";
import { cn } from "../../../lib/utils";

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      errorMessage,
      helperText,
      icon,
      id: providedId,
      invalid = false,
      label = "Choose file",
      maxFiles,
      onChange,
      onFilesChange,
      showPreview = true,
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = providedId ?? `dil-file-${generatedId}`;
    const labelId = `${id}-label`;
    const errorId = errorMessage ? `${id}-error` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;
    const description = [describedBy, helperId, errorId].filter(Boolean).join(" ") || undefined;
    const inputRef = useRef<HTMLInputElement>(null);
    const mergedRef = useMergeRefs([inputRef, ref]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const previewFile = selectedFiles.find((file) =>
      file.type.startsWith("image/"),
    );
    const [preview, setPreview] = useState<{ file: File; url: string }>();
    const previewUrl = preview?.file === previewFile ? preview?.url : undefined;

    useEffect(() => {
      if (!showPreview || !previewFile) return;
      const url = URL.createObjectURL(previewFile);
      // Skip committing an object URL if this effect was already cleaned up.
      let active = true;
      queueMicrotask(() => {
        if (active) setPreview({ file: previewFile, url });
      });
      return () => {
        active = false;
        URL.revokeObjectURL(url);
      };
    }, [previewFile, showPreview]);

    const handleFiles = (source: FileList, fromDrop = false) => {
      const input = inputRef.current;
      if (!input || props.disabled) return;

      const limit = Math.min(
        props.multiple ? Infinity : 1,
        Math.max(0, maxFiles ?? Infinity),
      );
      const files = Array.from(source).slice(0, limit);
      if (fromDrop || files.length !== source.length) {
        const transfer = new DataTransfer();
        files.forEach((file) => transfer.items.add(file));
        input.files = transfer.files;
      }
      setSelectedFiles(files);
      onFilesChange?.(files);
    };

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className={cn(
            "group block w-full cursor-pointer",
            props.disabled && "cursor-not-allowed",
          )}
          onDragEnter={(event) => {
            event.preventDefault();
            if (!props.disabled) setIsDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => {
            if (event.currentTarget === event.target) setIsDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleFiles(event.dataTransfer.files, true);
          }}
        >
          <span
            className={cn(
              "flex min-h-28 w-full flex-col items-center justify-center gap-1 rounded-[var(--dil-radius-md)] border border-dashed bg-[var(--dil-color-surface)] px-3 py-4 text-center text-(length:--dil-font-md) text-(--dil-color-text)",
              "group-focus-within:outline-2 group-focus-within:outline-offset-2 group-focus-within:outline-(--dil-color-text)",
              invalid || errorMessage
                ? "border-(--dil-color-danger)"
                : "border-(--dil-color-border) hover:border-(--dil-color-primary)",
              isDragging &&
                "border-(--dil-color-primary) bg-(--dil-color-primary)/10",
              props.disabled &&
                "cursor-not-allowed border-(--dil-color-muted) bg-(--dil-color-muted) opacity-70",
              className,
            )}
          >
            {showPreview && previewUrl ? (
              <img
                src={previewUrl}
                alt=""
                className="mb-1 size-16 rounded-(--dil-radius-sm) object-cover"
              />
            ) : icon ? (
              <span className="mb-1" aria-hidden="true">
                {icon}
              </span>
            ) : null}
            <span id={labelId}>{label}</span>
            {selectedFiles.length > 0 ? (
              <span className="max-w-full truncate text-(length:--dil-font-xs) text-(--dil-color-muted)">
                {selectedFiles.length === 1
                  ? selectedFiles[0].name
                  : `${selectedFiles.length} files selected`}
              </span>
            ) : null}
          </span>
          <input
            ref={mergedRef}
            id={id}
            type="file"
            className="sr-only"
            aria-invalid={invalid || Boolean(errorMessage)}
            aria-labelledby={props["aria-label"] ? undefined : labelId}
            aria-describedby={description}
            onChange={(event) => {
              if (event.currentTarget.files) handleFiles(event.currentTarget.files);
              onChange?.(event);
            }}
            {...props}
          />
        </label>
        {helperText ? (
          <p id={helperId} className={cn("mt-1 text-(length:--dil-font-xs) text-(--dil-color-muted)")}>
            {helperText}
          </p>
        ) : null}
        {errorMessage ? (
          <p
            id={errorId}
            className="mt-1 text-(length:--dil-font-xs) text-(--dil-color-danger)"
          >
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";
