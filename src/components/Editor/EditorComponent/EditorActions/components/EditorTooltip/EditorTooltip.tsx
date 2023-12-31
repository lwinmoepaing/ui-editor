interface IEditorTooltipProps {
  isLink: boolean;
}
// type FloatingMenuPosition = { x: number; y: number } | undefined;

const EditorTooltip = ({ isLink }: IEditorTooltipProps) => {
  console.log(isLink);
  // const ref = useRef<HTMLDivElement>(null);
  // const [pos, setPos] = useState<FloatingMenuPosition>(undefined);

  return null;
};
export default EditorTooltip;
