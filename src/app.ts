import * as _ from 'lodash';
import {bufferTimeSubscribe, multiBufferTimeSubscribe} from './rxjs/operators/transformation/bufferTime';
import {distinctUntilChangedSource} from './rxjs/operators/filtering/distinctUntilChanged';
/**
 * Appends a new list item with the given value to the element with the ID "output".
 *
 * @param value - The value to be added to the list item. It can be a string or a number.
 */
function out(value:string | number){
  const DocumentPage = document;
  const ListNode = DocumentPage.createElement("li");
  const TextNode = DocumentPage.createTextNode(value as string);
  ListNode.appendChild(TextNode);
  DocumentPage.querySelector("#output").appendChild(ListNode)
}

/**
 * Creates a new div element and sets its inner HTML content.
 * The content is a string created by joining the words 'Hello' and 'webpack' with a space.
 *
 * @returns {HTMLDivElement} The newly created div element with the specified inner HTML content.
 */
function component(Value:string | number = ''): HTMLDivElement {
  const ElementNode = document.createElement('div');
  ElementNode.innerHTML = _.join(['Hello', 'webpack', `${Value}`], ' ');
  return ElementNode;
}

document.body.appendChild(component());


/** RxJS Files */
/** Transformation */
// bufferTimeSubscribe;
// multiBufferTimeSubscribe;

/** Filtering */
distinctUntilChangedSource;


/** Typescript Files */