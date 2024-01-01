import * as stylex from "@stylexjs/stylex";

export const editorStyles = stylex.create({
  container: {
    position: "relative",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginTop: 40,
  },

  editor: {
    outline: "none",
  },
});

export const editorToolbarStyles = stylex.create({
  toolbarWrapper: {
    marginBottom: 20,
  },

  container: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },

  actionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    cursor: "pointer",
    borderWidth: 1,
    color: {
      ":hover": "white",
    },
    borderColor: {
      default: "#dfdfdf",
      ":hover": "#eee",
    },
    borderStyle: "solid",
    borderRadius: 10,
    padding: 5,
    background: {
      default: null,
      ":hover": "linear-gradient(315deg, #b92b27 , #1565c0)",
    },
  },

  activeButton: {
    color: "white",
    borderColor: {
      default: "#dfdfdf",
      ":hover": "#eee",
    },
    background: {
      default: "linear-gradient(315deg, #b92b27 , #1565c0)",
    },
  },
});

export const editorTooltipStyles = stylex.create({
  topTooltip: {
    position: "absolute",
    width: "max-content",
    top: 0,
    left: 0,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: {
      default: "#dfdfdf",
      ":hover": "#eee",
    },
  },
});

export const placeHolderStyle = stylex.create({
  container: {
    position: "relative",
    top: -23,
    color: "#777",
    fontSize: 20,
  },
});
