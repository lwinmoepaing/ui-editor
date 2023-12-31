import EditorToolbar from "./components/EditorToolbar/EditorToolbar";
import useEditorAction from "./hook/useEditorAction";

const EditorActions = () => {
  const { onClickAction, checkActiveButton } = useEditorAction();

  return (
    <>
      <EditorToolbar
        onClickAction={onClickAction}
        checkActiveButton={checkActiveButton}
      />
    </>
  );
};
export default EditorActions;
