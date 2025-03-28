import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

type BoxType = { id: number; content: string }

const draggableItems = [
  { id: 1, content: 'テキストブロック' },
  { id: 2, content: '画像' },
  { id: 3, content: 'ボタン' },
]

const DroppableArea = () => {
  const [items, setItems] = useState<BoxType[]>([])

  const [, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item: BoxType) => {
      setItems((prev) => [...prev, item])
    },
  }))

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '500px',
        border: '2px dashed #ccc',
        marginTop: '20px',
        padding: '10px',
      }}
    >
      <h3>ここにコンポーネントをドラッグしてください</h3>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          {item.content === 'テキストブロック' && <div>テキストコンテンツ</div>}
          {item.content === '画像' && <div>画像コンテンツ</div>}
          {item.content === 'ボタン' && <button>クリックしてね！</button>}
        </div>
      ))}
    </div>
  )
}

const DraggableItem = ({ item }: { item: BoxType }) => {
  const [, drag] = useDrag(() => ({
    type: 'box',
    item,
  }))

  return (
    <div
      ref={drag}  // drag関数を直接refに渡す
      style={{
        padding: '10px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        cursor: 'move',
      }}
    >
      {item.content}
    </div>
  )
}

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>ノーコードページ作成ツール</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '40%' }}>
          <h2>ドラッグ可能なコンポーネント</h2>
          {draggableItems.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </div>
        <DroppableArea />
      </div>
    </div>
  )
}

export default Home
