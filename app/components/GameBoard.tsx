const DIMENSIONS = {
  width: 15,
  height: 15,
};

const ROW_HEIGHT = `${(100 / DIMENSIONS.height).toString()}%`;
const CELL_WIDTH = `${(100 / DIMENSIONS.width).toString()}%`;

const GameBoard = () => {
  const renderGameBoardCell = ({
    rowIndex,
    index,
  }: {
    rowIndex: number;
    index: number;
  }) => {
    const evenRow = rowIndex % 2 === 0;
    const evenCell = index % 2 === 0;
    const darkerCell = evenRow ? evenCell : !evenCell;

    return (
      <div
        key={index}
        className={`h-full ${darkerCell ? 'bg-green-200' : 'bg-green-100'} `}
        style={{ width: CELL_WIDTH }}
      ></div>
    );
  };

  const renderGameBoardRow = ({ rowIndex }: { rowIndex: number }) => {
    return (
      <div
        key={rowIndex}
        className='w-full flex'
        style={{ height: ROW_HEIGHT }}
      >
        {Array.from({ length: DIMENSIONS.width }).map((_, index) =>
          renderGameBoardCell({ rowIndex, index })
        )}
      </div>
    );
  };

  return (
    <div className='w-full h-full mx-auto aspect-square max-w-[650px] max-h-[650px]'>
      {Array.from({ length: DIMENSIONS.height }).map((_, index) =>
        renderGameBoardRow({ rowIndex: index })
      )}
    </div>
  );
};

export default GameBoard;
