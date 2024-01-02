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
    top: -29,
    color: "#777",
    fontSize: 20,
  },
});

export const editorSideActionStyle = stylex.create({
  sideButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: {
      default: "#eee",
      ":hover": "#eee",
    },
    borderStyle: "solid",
    borderRadius: 18,
    width: 36,
    height: 36,
    cursor: "pointer",
    backgroundColor: "#eee",
    transition: "0.2s all ease-in-out",
    opacity: {
      default: 0.7,
      ":hover": 1,
    },
  },

  activedSideButton: {
    transform: {
      default: "rotate(135deg)",
      ":hover": "rotate(135deg)",
    },
  },

  activedRightContainer: {
    padding: "6px 8px",
    position: "absolute",
    borderRadius: 12,
    top: -6,
    left: 40,
    minWidth: 220,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  actionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: {
      default: "#6195ff",
      ":hover": "#6195ff",
    },
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 18,
    width: 36,
    height: 36,
    cursor: "pointer",
    backgroundColor: "white",
    color: "#6195ff",
  },

  actionButtonIcon: {
    fontSize: 20,
  },
});
