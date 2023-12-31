import EditorTooltip from "./components/EditorTooltip/EditorTooltip";
import useEditorAction from "./hook/useEditorAction";

const EditorActions = () => {
  const { onClickAction, checkActiveButton, isLink } = useEditorAction();

  return (
    <>
      <EditorTooltip
        isLink={isLink}
        onClickAction={onClickAction}
        checkActiveButton={checkActiveButton}
      />
    </>
  );
};
export default EditorActions;
