import React, { useState } from 'react';
import { Divider, Row } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import {
  sortableContainer,
  sortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

import CardSection from '../CardSection';

import { arrayMove, functionCaller } from '@/utils';

const DragHandle = SortableHandle(() => (
  <Row justify="end">
    <DragOutlined className="drag-icon" />
  </Row>
));
const SortableItem = sortableElement(({ value }) => (
  <li className="list-of-resume--ul--li">
    <DragHandle />
    {value}
  </li>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className="list-of-resume--ul">{children}</ul>;
});

const ListOfResume = ({ resumes = [], onSuccessEdit, onDropEnd }) => {
  const [items, setItems] = useState(resumes);

  if (!resumes?.length) {
    return null;
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    functionCaller(onDropEnd, newItems);
  };

  return (
    <div className="list-of-resume">
      <SortableContainer distance={1} onSortEnd={onSortEnd} useDragHandle>
        {items.map((resume, index) => (
          <SortableItem
            key={`item-${resume.id}`}
            index={index}
            value={
              <>
                <CardSection resume={resume} onSuccessEdit={onSuccessEdit} />
                <Divider />
              </>
            }
          />
        ))}
      </SortableContainer>
    </div>
  );
};

export default ListOfResume;
