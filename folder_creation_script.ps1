$folders = @(
    # =========================
    # COMPONENTS
    # =========================

    "src/components/actions/Button",
    "src/components/actions/IconButton",

    "src/components/forms/Input",
    "src/components/forms/TextArea",
    "src/components/forms/Select",
    "src/components/forms/Checkbox",
    "src/components/forms/Radio",
    "src/components/forms/Switch",

    "src/components/layout/Box",
    "src/components/layout/Flex",
    "src/components/layout/Grid",
    "src/components/layout/Stack",
    "src/components/layout/Container",

    "src/components/navigation/Tabs",
    "src/components/navigation/Breadcrumb",
    "src/components/navigation/Pagination",
    "src/components/navigation/Menu",

    "src/components/feedback/Alert",
    "src/components/feedback/Toast",
    "src/components/feedback/Progress",
    "src/components/feedback/Spinner",
    "src/components/feedback/Skeleton",

    "src/components/overlay/Modal",
    "src/components/overlay/Drawer",
    "src/components/overlay/Tooltip",
    "src/components/overlay/Popover",
    "src/components/overlay/Dialog",

    "src/components/data-display/Card",
    "src/components/data-display/Badge",
    "src/components/data-display/Avatar",
    "src/components/data-display/Table",
    "src/components/data-display/Timeline",

    "src/components/data-entry/DatePicker",
    "src/components/data-entry/TimePicker",
    "src/components/data-entry/Combobox",
    "src/components/data-entry/MultiSelect",

    "src/components/effects/TextHover",
    "src/components/effects/Marquee",
    "src/components/effects/Typewriter",
    "src/components/effects/Counter",
    "src/components/effects/GradientText",

    # =========================
    # HOOKS
    # =========================

    "src/hooks/useTheme",
    "src/hooks/useToggle",
    "src/hooks/useDebounce",
    "src/hooks/useMediaQuery",
    "src/hooks/useLocalStorage",

    # =========================
    # THEME SYSTEM
    # =========================

    "src/theme/provider",
    "src/theme/presets",
    "src/theme/tokens",
    "src/theme/css",
    "src/theme/types",

    # =========================
    # ICONS
    # =========================

    "src/icons",

    # =========================
    # UTILS
    # =========================

    "src/utils",

    # =========================
    # GLOBAL TYPES
    # =========================

    "src/types"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

Write-Host ""
Write-Host "✅ dil-ui folder structure created successfully"