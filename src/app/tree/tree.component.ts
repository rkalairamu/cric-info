import {Component, Input, Output, ViewChild, EventEmitter, DoCheck} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {Observable, of as observableOf} from 'rxjs';
import {ContextMenuComponent} from 'ngx-contextmenu';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})

export class TreeComponent implements DoCheck {
  @Input() players: any;
  @Output() playerId = new EventEmitter<number>();
  @Output() deletePlayerId = new EventEmitter<number>();
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  isAdmin: boolean;

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.name, level, node.type);
  }
  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  constructor(private userService: UserService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.isAdmin = this.userService.isAdmin();
  }

  ngDoCheck() {
    this.dataSource.data = this.buildFileTree(this.players || [], 0);
    this.treeControl.expandAll();
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.name = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  showDetail(playerId: number) {
    this.playerId.emit(playerId);
  }

  deletePlayer(event) {
    this.deletePlayerId.emit(event.item.name);
  }

}

/**
 * File node data with nested structure.
 * Each node has a name, and a type or a list of children.
 */
class FileNode {
  children: FileNode[];
  name: string;
  type: any;
}

/** Flat node with expandable and level information */
class FileFlatNode {
  constructor(
    public expandable: boolean, public name: string, public level: number, public type: any) {
  }
}
