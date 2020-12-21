import {Component, OnDestroy} from '@angular/core';
import {SelectedMappingFilters} from '../../../util/selected-mappings-filter';
import {PackageNode, PackageTree} from '../../../util/package-tree';
import {PackageManagementService} from '../../../services/package-management.service';
import {map} from 'rxjs/operators';
import {Observable, Subscription, SubscriptionLike} from 'rxjs';
import {DetailedMapping, Mapping, MappingsService} from '../../../../generated';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent implements OnDestroy{

  selectedPackage = '';
  selectedFilters: SelectedMappingFilters | null;

  selectedClass : DetailedMapping | null = null;

  private getSelectedClassSubscription: SubscriptionLike | null = null;

  constructor(
    private mappingsService: MappingsService
  ) {
  }

  ngOnDestroy(): void {
    this.getSelectedClassSubscription?.unsubscribe();
  }

  onPackageSelected(packageName: string) {
    this.selectedPackage = packageName;
  }

  onClassSelected(selectedClass: Mapping) {
    this.getSelectedClassSubscription?.unsubscribe();
    this.getSelectedClassSubscription = this.mappingsService.getDetailedMappingById({
      id: selectedClass.id?? ""
    })
    .subscribe(detailedMapping => this.selectedClass = detailedMapping);
  }

}
