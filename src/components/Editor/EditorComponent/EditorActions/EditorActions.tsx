import EditorToolbar from "./components/EditorToolbar/EditorToolbar";
import EditorTooltip from "./components/EditorTooltip/EditorTooltip";
import useEditorAction from "./hook/useEditorAction";

const EditorActions = () => {
  const { onClickAction, checkActiveButton, isLink } = useEditorAction();

  return (
    <>
      <EditorToolbar
        onClickAction={onClickAction}
        checkActiveButton={checkActiveButton}
      />
      <EditorTooltip isLink={isLink} />
    </>
  );
};
export default EditorActions;
