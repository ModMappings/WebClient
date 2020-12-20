import {Component, OnDestroy} from '@angular/core';
import {SelectedMappingFilters} from '../../../util/selected-mappings-filter';
import {PackageNode, PackageTree} from '../../../util/package-tree';
import {PackageManagementService} from '../../../services/package-management.service';
import {map} from 'rxjs/operators';
import {Observable, Subscription, SubscriptionLike} from 'rxjs';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent {

  selectedPackage = '';
  selectedFilters: SelectedMappingFilters | null;

  constructor(
  ) {
  }

  onPackageSelected(packageName: string) {
    this.selectedPackage = packageName;
  }
}
