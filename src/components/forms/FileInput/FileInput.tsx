import { forwardRef, useEffect, useId, useMemo, useState } from "react";

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
      onChange,
      onFilesChange,
      showPreview = true,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = providedId ?? `dil-file-${generatedId}`;
    const errorId = errorMessage ? `${id}-error` : undefined;
    const helperId = helperText && !errorMessage ? `${id}-helper` : undefined;
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const previewFile = selectedFiles.find((file) =>
      file.type.startsWith("image/"),
    );
    const previewUrl = useMemo(
      () =>
        showPreview && previewFile
          ? URL.createObjectURL(previewFile)
          : undefined,
      [previewFile, showPreview],
    );

    useEffect(() => {
      return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      };
    }, [previewUrl]);

    const handleFiles = (files: File[]) => {
      if (props.disabled) return;
      setSelectedFiles(files);
      onFilesChange?.(files);
    };

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className={cn(
            "block w-full cursor-pointer",
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
            handleFiles(Array.from(event.dataTransfer.files));
          }}
        >
          <span
            className={cn(
              "flex min-h-28 w-full flex-col items-center justify-center gap-1 rounded-[var(--dil-radius-md)] border border-dashed bg-[var(--dil-color-surface)] px-3 py-4 text-center text-(length:--dil-font-md) text-(--dil-color-text)",
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
            <span>{label}</span>
            {selectedFiles.length > 0 ? (
              <span className="max-w-full truncate text-(length:--dil-font-xs) text-(--dil-color-muted)">
                {selectedFiles.length === 1
                  ? selectedFiles[0].name
                  : `${selectedFiles.length} files selected`}
              </span>
            ) : helperText ? (
              <span className="text-(length:--dil-font-xs) text-(--dil-color-muted)">
                {helperText}
              </span>
            ) : null}
          </span>
          <input
            ref={ref}
            id={id}
            type="file"
            className="sr-only"
            aria-invalid={invalid || Boolean(errorMessage)}
            aria-describedby={errorId ?? helperId}
            onChange={(event) => {
              handleFiles(Array.from(event.target.files ?? []));
              onChange?.(event);
            }}
            {...props}
          />
        </label>
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
