/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */
import {
    paddings,
    placeholderStyles,
    colorOut,
    unit,
    absolutePosition,
    pointerEvents,
    margins,
    negative,
    textInputSizingFromSpacing,
} from "@library/styles/styleHelpers";
import { styleFactory, useThemeCache } from "@library/styles/styleUtils";
import { globalVariables } from "@library/styles/globalStyleVars";
import { formElementsVariables } from "@library/forms/formElementStyles";
import { calc, percent, px } from "csx";
import { titleBarVariables } from "@library/headers/titleBarStyles";
import { richEditorVariables } from "@rich-editor/editor/richEditorVariables";

export const richEditorFormClasses = useThemeCache((legacyMode: boolean = false) => {
    const globalVars = globalVariables();
    const headerVars = titleBarVariables();
    const vars = richEditorVariables();
    const formElementVars = formElementsVariables();
    const style = styleFactory("richEditorForm");
    const overshoot = legacyMode ? 0 : vars.scrollContainer.overshoot;
    const root = style({});

    const textWrap = style("textWrap", {
        ...paddings({
            top: 0,
            bottom: 0,
            right: unit(globalVars.gutter.quarter),
            left: unit(globalVars.gutter.quarter),
        }),
    });

    const title = style("title", {
        $nest: {
            "&.inputText, &&": {
                ...textInputSizingFromSpacing(vars.title.fontSize, 0, formElementVars.border.fullWidth),
                color: colorOut(formElementVars.colors.fg),
                backgroundColor: colorOut(formElementVars.colors.bg),
                position: "relative",
                fontWeight: globalVars.fonts.weights.semiBold,
                border: `solid transparent 2px`,
                borderRadius: 0,
                ...paddings({
                    left: 0,
                    right: 0,
                }),
                $nest: {
                    "&:focus": {
                        borderBottomColor: colorOut(globalVars.mainColors.primary, true),
                    },
                },
            },
            "&:not(.focus-visible)": {
                outline: "none",
            },
            ...placeholderStyles({
                lineHeight: "inherit",
                padding: "inherit",
                color: colorOut(formElementVars.placeholder.color),
            }),
        },
    });

    const editor = style("editor", {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginTop: unit(-formElementVars.border.width),
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
    });

    const body = style("body", {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        flexGrow: 1,
        maxHeight: calc(`100vh - ${unit(headerVars.sizing.height)}`),
        paddingTop: unit(globalVars.overlay.fullPageHeadingSpacer),
        marginBottom: px(12),
        overflow: "hidden",
    });

    const inlineMenuItems = style("inlineMenuItems", {
        borderBottom: `${unit(formElementVars.border.width)} solid ${colorOut(formElementVars.border.color)}`,
    });

    const formContent = style("formContent", {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    });

    const scrollFrame = style("scrollFrame", {
        margin: "auto",
        height: "initial",
        minHeight: unit(vars.sizing.minHeight + vars.menuButton.size),
        position: "relative",
        backgroundColor: colorOut(vars.colors.bg),
        display: !legacyMode ? "flex" : undefined,
        flexDirection: !legacyMode ? "column" : undefined,
        flexGrow: !legacyMode ? 1 : undefined,
        padding: 0,
        width: legacyMode ? percent(100) : calc(`100% + ${unit(overshoot * 2)}`),
        marginLeft: legacyMode ? undefined : unit(-overshoot),
        paddingLeft: legacyMode ? undefined : unit(overshoot),
        paddingRight: legacyMode ? undefined : unit(overshoot),
        overflow: !legacyMode ? "auto" : undefined,
        $nest: {
            "&.isMenuInset": {
                overflow: "initial",
                position: "relative",
            },
        },
    });

    const scrollContainer = style("scrollContainer", {
        position: "relative",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        ...paddings({
            top: globalVars.gutter.half,
            bottom: globalVars.gutter.size,
        }),
    });

    const bodyErrorMessage = style("bodyErrorMessage", {
        ...absolutePosition.topLeft(),
    });

    const titleErrorMessage = style("titleErrorMessage", {
        ...pointerEvents(),
        ...margins({
            top: unit(negative(globalVars.spacer.size)),
            bottom: globalVars.spacer.size,
        }),
    });

    const categoryErrorParagraph = style("categoryErrorParagraph", {
        ...margins({
            vertical: 8,
        }),
    });

    const titleErrorParagraph = style("titleErrorParagraph", {
        lineHeight: unit(globalVars.lineHeights.base * globalVars.fonts.size.large + 2),
    });

    return {
        root,
        textWrap,
        title,
        editor,
        scrollFrame,
        scrollContainer,
        body,
        inlineMenuItems,
        formContent,
        bodyErrorMessage,
        titleErrorMessage,
        categoryErrorParagraph,
        titleErrorParagraph,
    };
});
