/** @jsx React.DOM */

var Sortable = {
  getDefaultProps: function() {
    return {
      "data-id" : this.props.key,
      draggable : true,
      onDragEnd: this.sortEnd.bind(this),
      onDragOver: this.dragOver.bind(this),
      onDragStart: this.sortStart.bind(this)
    }
  },
  update: function(to, from) {
    var data = this.props.data.items;
    data.splice(to, 0, data.splice(from,1)[0]);
    this.props.sort(data, to);
  },
  sortEnd: function() {
    this.props.sort(this.props.data.items, undefined);
  },
  sortStart: function(e) {
    this.dragged = e.currentTarget.dataset.id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", null);
  },
  move: function(over,append) {
    var to = Number(over.dataset.id);
    var from = this.props.data.dragging || Number(this.dragged);
    if(append) to++;
    if(from < to) to--;
    this.update(to,from);
  },
  dragOver: function(e) {
    e.preventDefault();
    var over = e.currentTarget
    var relY = e.clientY - over.offsetTop;
    var height = over.offsetHeight / 2;
    var placement = this.placement ? this.placement(e.clientX, e.clientY, over) : relY > height
    this.move(over, placement);
  },
  isDragging: function() {
    return this.props.data.dragging == this.props.key
  }
}
