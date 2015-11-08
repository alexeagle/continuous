import {Component} from 'angular2/angular2';
import {Breakages} from './breakages';

@Component({
  selector: "app",
  template: `
    <breakages *ng-if="anybreakages"></breakages>
  `,
  directives: [Breakages],
})
export class App {
  get anybreakages(): boolean {
    return true;
  }
}
