import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import { getEmptyImage } from "react-dnd-html5-backend";

import ItemType from "../containers/item-types";
import {removeItem , all_courses} from "../actions/course-action";

let all_courses_remaining =[];

const Types = {
  CARD: "card"
};

const cardSource = {
  beginDrag(props) {
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, component) {
    const getDropResult = monitor.getDropResult();
    const item = monitor.getItem();
    const text = document.getElementById(item.id).textContent;
    if(getDropResult && getDropResult.moved){
      all_courses_remaining = removeItem(text, props.addItem, props.removeItem);
      props.updateArray(all_courses_remaining);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    didDrop: monitor.didDrop()
  };
}

class DraggableListItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { connectDragPreview } = this.props;

    const img = new Image();
    img.src = "../public/assets/images/box.jpeg";
    img.height = 20;
    img.width = 50;
    img.onload = () => connectDragPreview(img);
  }


  render() {
    const { isDragging, connectDragSource, id } = this.props;
    return connectDragSource(
      <div id={this.props.id}>
        <ListGroupItem style={getItemStyle(isDragging)} className="list-item">
         {this.props.text}
        </ListGroupItem>
      </div>
    );
  }
}

function getItemStyle(isDragging) {
  let style ;
  if(isDragging){
    style = {
      backgroundColor: "black",
      color: "white",
        width: "180px"
    }
  } else {
      style = {
        marginBottom: "10px",
        width: "180px"
      }
  }
  return style;
}

export default DragSource(ItemType.CARD, cardSource, collect)(DraggableListItem);
