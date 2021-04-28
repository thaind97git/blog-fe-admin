import React, { useState } from 'react';
import { Row } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import {
  sortableContainer,
  sortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

import { arrayMove, functionCaller } from '@/utils';
import { NormalContent } from './RightContent';

const DragHandle = SortableHandle(() => (
  <Row justify="end">
    <DragOutlined className="drag-icon" />
  </Row>
));

const SortableItem = sortableElement(({ value }) => (
  <li className="list-of-sub-section--ul--li">
    <DragHandle /> {value}
  </li>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className="list-of-sub-section--ul">{children}</ul>;
});

const ListOfSubSection = ({ subSections = [], onDropEnd }) => {
  const [items, setItems] = useState(subSections);

  if (!subSections?.length) {
    return null;
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    functionCaller(onDropEnd, newItems);
  };

  return (
    <div className="list-of-sub-section">
      <SortableContainer distance={1} onSortEnd={onSortEnd} useDragHandle>
        {items.map((resume, index) => (
          <SortableItem
            key={`item-${resume.id}`}
            index={index}
            value={<NormalContent resume={resume} />}
          />
        ))}
      </SortableContainer>
    </div>
  );
};

export default ListOfSubSection;
