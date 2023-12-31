import { $isRangeSelection, EditorState, RangeSelection } from "lexical";

export function $isRangeSelected(
  selection: EditorState["_selection"]
): selection is RangeSelection {
  return $isRangeSelection(selection) && !selection.anchor.is(selection.focus);
}
