import React from 'react';
import { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import { getTheme } from './todoTheme';

// must stay in sync with the shape size set in styles.css
const SHAPE_SIZE = 70

// nearest unoccupied column to `nc` within a single layer's row
function pickColumn(nc, columns, occupied) {
   if (!occupied.has(nc)) return nc

   for (let d = 1; d < columns; d++) {
      const left = nc - d
      const right = nc + d
      if (left >= 0 && !occupied.has(left)) return left
      if (right < columns && !occupied.has(right)) return right
   }
   return nc
}

// a layer can only carry shapes while it stays strictly smaller than the layer beneath it -
// otherwise there's nothing wide enough to balance on and it has to slide down one level.
// cascades all the way to the floor if every existing layer is already "full" relative to its support.
function resolveLayer(layerCounts) {
   let layer = layerCounts.length
   while (layer > 0) {
      const below = layerCounts[layer - 1] || 0
      const current = layerCounts[layer] || 0
      if (current + 1 < below) return layer
      layer--
   }
   return 0
}

const TodoList = ({ todos, setTodos }) => {

   const [shapes, setShapes] = useState([])
   const listRef = useRef(null)
   const prevLength = useRef(todos.length)

   useEffect(() => {
      if (todos.length > prevLength.current && listRef.current) {
         listRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
      prevLength.current = todos.length
   }, [todos])

   function handleDelete(todo, cardEl) {
      const theme = getTheme(todo.id)
      const uid = `${todo.id}-${Date.now()}`

      // drop straight down from wherever the card's own decorative shape sits
      const cardRect = cardEl ? cardEl.getBoundingClientRect() : null
      const startLeft = cardRect ? cardRect.right - 10 - SHAPE_SIZE : 0
      const startTop = cardRect ? cardRect.bottom - SHAPE_SIZE : 0

      const columns = Math.max(1, Math.floor(window.innerWidth / SHAPE_SIZE))
      const nc = Math.min(columns - 1, Math.max(0, Math.round(startLeft / SHAPE_SIZE)))

      // rebuild layer occupancy straight from what's already rendered, so it can never drift out of sync
      const layerOccupied = [] // Set of occupied columns, indexed by layer (0 = floor)
      shapes.forEach((s) => {
         if (!layerOccupied[s.layer]) layerOccupied[s.layer] = new Set()
         layerOccupied[s.layer].add(s.col)
      })
      const layerCounts = layerOccupied.map((set) => (set ? set.size : 0))

      // falling straight down at nc, it first hits whatever is stacked highest directly under it
      let impactLayer = 0
      layerOccupied.forEach((set, i) => {
         if (set && set.has(nc)) impactLayer = Math.max(impactLayer, i + 1)
      })
      const impactTop = window.innerHeight - SHAPE_SIZE - impactLayer * SHAPE_SIZE

      const landLayer = resolveLayer(layerCounts)
      const landCol = pickColumn(nc, columns, layerOccupied[landLayer] || new Set())
      const finalTop = window.innerHeight - SHAPE_SIZE - landLayer * SHAPE_SIZE
      const finalLeft = landCol * SHAPE_SIZE

      const rotate = Math.random() * 20 - 10
      const settled = landCol === nc && landLayer === impactLayer
      const rollRotate = settled ? rotate : rotate + (landCol >= nc ? 1 : -1) * (45 + Math.random() * 40)

      setShapes((prev) => [
         ...prev,
         {
            uid, theme, startLeft, startTop, impactTop, finalLeft, finalTop,
            layer: landLayer, col: landCol, rotate, rollRotate, phase: 'start',
         },
      ])

      // wait a frame so the shape paints at its start position before the fall transition kicks in
      requestAnimationFrame(() => {
         requestAnimationFrame(() => {
            setShapes((prev) => prev.map((s) => (s.uid === uid ? { ...s, phase: 'falling' } : s)))
         })
      })

      setTimeout(() => {
         setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id))
      }, 350)
   }

   function handleShapeTransitionEnd(uid, propertyName) {
      if (propertyName !== 'top') return
      setShapes((prev) => prev.map((s) => (s.uid === uid && s.phase === 'falling' ? { ...s, phase: 'rolling' } : s)))
   }

   return (
      <div className="todo-list-wrapper">
         <div className="todo-list" ref={listRef}>
            {todos.map((todo) => (
               <TodoItem key={todo.id} setTodos={setTodos} todos={todos} todo={todo} onDelete={handleDelete} />
            ))}
            {todos.length === 0 && <p className="todo-empty">There is nothing to do</p>}
         </div>
         <div className="falling-shapes">
            {shapes.map((s) => {
               const isRolling = s.phase === 'rolling'
               const transition = s.phase === 'start'
                  ? 'none'
                  : isRolling
                     ? 'top 0.35s cubic-bezier(0.33, 1, 0.68, 1), left 0.35s cubic-bezier(0.33, 1, 0.68, 1), transform 0.35s cubic-bezier(0.33, 1, 0.68, 1)'
                     : 'top 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19), transform 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19)'

               return (
                  <span
                     key={s.uid}
                     className={`falling-shape shape-${s.theme.shapeType}`}
                     style={{
                        left: `${isRolling ? s.finalLeft : s.startLeft}px`,
                        top: `${s.phase === 'start' ? s.startTop : isRolling ? s.finalTop : s.impactTop}px`,
                        transform: `rotate(${s.phase === 'start' ? 0 : isRolling ? s.rollRotate : s.rotate}deg)`,
                        transition,
                        background: s.theme.shape,
                     }}
                     onTransitionEnd={(e) => handleShapeTransitionEnd(s.uid, e.propertyName)}
                  />
               )
            })}
         </div>
      </div>
   );
};

export default TodoList;
