import { useEffect } from "react";
import { useHistoryStore } from "@/store/historyStore";
import cls from "../Header/Header.module.scss";

export function useGlobalUndoRedoShortcuts() {
  const undo = useHistoryStore((s) => s.undo);
  const redo = useHistoryStore((s) => s.redo);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!e.ctrlKey && !e.metaKey) return;

      if (e.code === "KeyZ" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (e.code === "KeyY" || (e.code === "KeyZ" && e.shiftKey)) {
        e.preventDefault();
        redo();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);
}

export function UndoRedoControls() {
  const past = useHistoryStore((s) => s.past);
  const future = useHistoryStore((s) => s.future);
  const undo = useHistoryStore((s) => s.undo);
  const redo = useHistoryStore((s) => s.redo);
  const isProcessing = useHistoryStore((s) => s.isProcessing);

  useGlobalUndoRedoShortcuts();

  return (
    <div className={cls.undoRedoGroup}>
      <button
        type="button"
        onClick={undo}
        disabled={past.length === 0 || isProcessing}
        title="Отменить (Ctrl+Z)"
        className={cls.undoRedoBtn}
      >
        ↩
      </button>
      <button
        type="button"
        onClick={redo}
        disabled={future.length === 0 || isProcessing}
        title="Повторить (Ctrl+Y)"
        className={cls.undoRedoBtn}
      >
        ↪
      </button>
    </div>
  );
}
