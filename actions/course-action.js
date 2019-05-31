import ls from "localstorage-ttl";
import courseData from "../database/course-list.json";

export let all_courses = ls.get("allCourses") ? ls.get("allCourses") : courseData.courses;

export let assigned_courses = ls.get("assignedCourses") ? ls.get("assignedCourses") : [];

export function removeItem(text, addItem, removeItem){
  let index;
  removeItem.map(data => {
    if(data.title === text) {
      addItem.push(data);
      index = removeItem.indexOf(data);
    }
  })

  removeItem.splice(index, 1);

  return {removeItem, addItem};
}

export function reorderedItems() {

  return {all_courses, assigned_courses};
}
