import React, { useEffect, useState } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

import SkillItem from './Skill';

import { arrayMove, functionCaller, arrayRemoveByIndex } from '@/utils';

const Handle = SortableHandle(({ tabIndex, value, items, onRemoveItem }) => (
  <div tabIndex={tabIndex}>
    <SkillItem
      title={value}
      onClose={() => {
        functionCaller(onRemoveItem, arrayRemoveByIndex(items, tabIndex));
      }}
    />
  </div>
));

const SortableItem = SortableElement(({ shouldUseDragHandle, ...rest }) => (
  <div className="sort-skill-container--item">
    {shouldUseDragHandle && <Handle {...rest} />}
  </div>
));

const SortableList = SortableContainer(props => {
  const { items, ...restProps } = props;
  return (
    <div className="sort-skill-container">
      {items.map((item, index) => (
        <SortableItem
          key={`item-${item}`}
          tabIndex={index}
          index={index}
          value={item}
          items={items}
          {...restProps}
        />
      ))}
    </div>
  );
});

const SkillDragDrop = ({ skills = [], onAfterChange }) => {
  const [items, setItems] = useState(skills);

  useEffect(() => {
    setItems(skills);
  }, [skills]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    onAfterChange(newItems);
  };

  const onRemoveItem = newItems => {
    if (newItems) {
      setItems(newItems);
      onAfterChange(newItems);
    }
  };

  if (!items?.length) {
    return null;
  }

  return (
    <SortableList
      onRemoveItem={onRemoveItem}
      shouldUseDragHandle={true}
      useDragHandle
      axis="xy"
      items={items}
      onSortEnd={onSortEnd}
    />
  );
};

export default SkillDragDrop;
