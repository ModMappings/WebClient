import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PackageTree} from '../../../util/package-tree';
import * as fastDeepEqual from 'fast-deep-equal';
import {
  GameVersion,
  GameVersionsService,
  MappableType,
  Mapping,
  MappingsService,
  MappingType,
  MappingTypesService
} from '../../../../generated';
import {debounceTime, distinctUntilChanged, filter, map, shareReplay, startWith, switchMap, tap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {combineLatest, merge, Subject} from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';
import {quoteRegex} from '../../../util/quote-regex';
import {getAllPages} from '../../../util/observable-functions';

const packages = [
  'com/mojang/blaze3d',
  'com/mojang/blaze3d/matrix',
  'com/mojang/blaze3d/platform',
  'com/mojang/blaze3d/systems',
  'com/mojang/blaze3d/vertex',
  'com/mojang/realmsclient',
  'com/mojang/realmsclient/client',
  'com/mojang/realmsclient/dto',
  'com/mojang/realmsclient/exception',
  'com/mojang/realmsclient/gui',
  'com/mojang/realmsclient/gui/screens',
  'com/mojang/realmsclient/util',
  'net/minecraft/advancements',
  'net/minecraft/advancements/criterion',
  'net/minecraft/block',
  'net/minecraft/block/material',
  'net/minecraft/block/pattern',
  'net/minecraft/block/trees',
  'net/minecraft/client',
  'net/minecraft/client/audio',
  'net/minecraft/client/entity/player',
  'net/minecraft/client/gui',
  'net/minecraft/client/gui/advancements',
  'net/minecraft/client/gui/chat',
  'net/minecraft/client/gui/fonts',
  'net/minecraft/client/gui/fonts/providers',
  'net/minecraft/client/gui/overlay',
  'net/minecraft/client/gui/recipebook',
  'net/minecraft/client/gui/screen',
  'net/minecraft/client/gui/screen/inventory',
  'net/minecraft/client/gui/spectator',
  'net/minecraft/client/gui/spectator/categories',
  'net/minecraft/client/gui/toasts',
  'net/minecraft/client/gui/widget',
  'net/minecraft/client/gui/widget/button',
  'net/minecraft/client/gui/widget/list',
  'net/minecraft/client/main',
  'net/minecraft/client/multiplayer',
  'net/minecraft/client/network',
  'net/minecraft/client/network/handshake',
  'net/minecraft/client/network/login',
  'net/minecraft/client/network/play',
  'net/minecraft/client/network/status',
  'net/minecraft/client/particle',
  'net/minecraft/client/renderer',
  'net/minecraft/client/renderer/chunk',
  'net/minecraft/client/renderer/color',
  'net/minecraft/client/renderer/culling',
  'net/minecraft/client/renderer/debug',
  'net/minecraft/client/renderer/entity',
  'net/minecraft/client/renderer/entity/layers',
  'net/minecraft/client/renderer/entity/model',
  'net/minecraft/client/renderer/model',
  'net/minecraft/client/renderer/model/multipart',
  'net/minecraft/client/renderer/texture',
  'net/minecraft/client/renderer/tileentity',
  'net/minecraft/client/renderer/tileentity/model',
  'net/minecraft/client/renderer/vertex',
  'net/minecraft/client/resources',
  'net/minecraft/client/resources/data',
  'net/minecraft/client/settings',
  'net/minecraft/client/shader',
  'net/minecraft/client/tutorial',
  'net/minecraft/client/util',
  'net/minecraft/client/world',
  'net/minecraft/command',
  'net/minecraft/command/arguments',
  'net/minecraft/command/arguments/serializers',
  'net/minecraft/command/impl',
  'net/minecraft/command/impl/data',
  'net/minecraft/crash',
  'net/minecraft/data',
  'net/minecraft/data/advancements',
  'net/minecraft/data/loot',
  'net/minecraft/dispenser',
  'net/minecraft/enchantment',
  'net/minecraft/entity',
  'net/minecraft/entity/ai',
  'net/minecraft/entity/ai/attributes',
  'net/minecraft/entity/ai/brain',
  'net/minecraft/entity/ai/brain/memory',
  'net/minecraft/entity/ai/brain/schedule',
  'net/minecraft/entity/ai/brain/sensor',
  'net/minecraft/entity/ai/brain/task',
  'net/minecraft/entity/ai/controller',
  'net/minecraft/entity/ai/goal',
  'net/minecraft/entity/boss',
  'net/minecraft/entity/boss/dragon',
  'net/minecraft/entity/boss/dragon/phase',
  'net/minecraft/entity/effect',
  'net/minecraft/entity/item',
  'net/minecraft/entity/item/minecart',
  'net/minecraft/entity/merchant',
  'net/minecraft/entity/merchant/villager',
  'net/minecraft/entity/monster',
  'net/minecraft/entity/passive',
  'net/minecraft/entity/passive/fish',
  'net/minecraft/entity/passive/horse',
  'net/minecraft/entity/player',
  'net/minecraft/entity/projectile',
  'net/minecraft/entity/villager',
  'net/minecraft/fluid',
  'net/minecraft/inventory',
  'net/minecraft/inventory/container',
  'net/minecraft/item',
  'net/minecraft/item/crafting',
  'net/minecraft/nbt',
  'net/minecraft/network',
  'net/minecraft/network/datasync',
  'net/minecraft/network/handshake',
  'net/minecraft/network/handshake/client',
  'net/minecraft/network/login',
  'net/minecraft/network/login/client',
  'net/minecraft/network/login/server',
  'net/minecraft/network/play',
  'net/minecraft/network/play/client',
  'net/minecraft/network/play/server',
  'net/minecraft/network/rcon',
  'net/minecraft/network/status',
  'net/minecraft/network/status/client',
  'net/minecraft/network/status/server',
  'net/minecraft/particles',
  'net/minecraft/pathfinding',
  'net/minecraft/potion',
  'net/minecraft/profiler',
  'net/minecraft/realms',
  'net/minecraft/realms/pluginapi',
  'net/minecraft/resources',
  'net/minecraft/resources/data',
  'net/minecraft/scoreboard',
  'net/minecraft/server',
  'net/minecraft/server/dedicated',
  'net/minecraft/server/gui',
  'net/minecraft/server/integrated',
  'net/minecraft/server/management',
  'net/minecraft/state',
  'net/minecraft/state/properties',
  'net/minecraft/stats',
  'net/minecraft/tags',
  'net/minecraft/test',
  'net/minecraft/tileentity',
  'net/minecraft/util',
  'net/minecraft/util/concurrent',
  'net/minecraft/util/datafix',
  'net/minecraft/util/datafix/fixes',
  'net/minecraft/util/datafix/versions',
  'net/minecraft/util/math',
  'net/minecraft/util/math/shapes',
  'net/minecraft/util/palette',
  'net/minecraft/util/registry',
  'net/minecraft/util/text',
  'net/minecraft/util/text/event',
  'net/minecraft/village',
  'net/minecraft/world',
  'net/minecraft/world/biome',
  'net/minecraft/world/biome/provider',
  'net/minecraft/world/border',
  'net/minecraft/world/chunk',
  'net/minecraft/world/chunk/listener',
  'net/minecraft/world/chunk/storage',
  'net/minecraft/world/dimension',
  'net/minecraft/world/end',
  'net/minecraft/world/gen',
  'net/minecraft/world/gen/area',
  'net/minecraft/world/gen/blockplacer',
  'net/minecraft/world/gen/blockstateprovider',
  'net/minecraft/world/gen/carver',
  'net/minecraft/world/gen/feature',
  'net/minecraft/world/gen/feature/jigsaw',
  'net/minecraft/world/gen/feature/structure',
  'net/minecraft/world/gen/feature/template',
  'net/minecraft/world/gen/foliageplacer',
  'net/minecraft/world/gen/layer',
  'net/minecraft/world/gen/layer/traits',
  'net/minecraft/world/gen/placement',
  'net/minecraft/world/gen/surfacebuilders',
  'net/minecraft/world/gen/treedecorator',
  'net/minecraft/world/level',
  'net/minecraft/world/lighting',
  'net/minecraft/world/raid',
  'net/minecraft/world/server',
  'net/minecraft/world/spawner',
  'net/minecraft/world/storage',
  'net/minecraft/world/storage/loot',
  'net/minecraft/world/storage/loot/conditions',
  'net/minecraft/world/storage/loot/functions',
];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  gameVersions: GameVersion[] | null = null;
  mappingTypes: MappingType[] | null = null;
  packageTree: PackageTree | null = null;

  classesLoading = false;
  classes: string[] = [];
  private gameVersion: GameVersion | null = null;

  mappingsLoading = false;
  mappingsTotalCount = 0;
  mappings: Mapping[] | null;

  gameVersionControl: FormControl;
  mappingTypeControl: FormControl;
  selectionFormGroup: FormGroup;

  searchControl: FormControl;

  pageChanged = new Subject<PageEvent>();
  sortChanged = new Subject<Sort>();

  constructor(
    private router: Router,
    private mappingTypesService: MappingTypesService,
    private mappingsService: MappingsService,
    private gameVersionsService: GameVersionsService
  ) {

    this.selectionFormGroup = new FormGroup({
      gameVersion: (this.gameVersionControl = new FormControl(null, Validators.required)),
      mappingType: (this.mappingTypeControl = new FormControl(null, Validators.required))
    });
    this.searchControl = new FormControl('');
    this.searchControl.disable();
    this.gameVersionControl.disable();
    this.mappingTypeControl.disable();
  }

  ngOnInit() {
    this.gameVersionsService.getGameVersionsBySearchCriteria({})
      .pipe(
        getAllPages(pageIndex => this.gameVersionsService.getGameVersionsBySearchCriteria({page: pageIndex}))
      )
      .subscribe(gameVersions => {
        this.gameVersions = gameVersions;
        this.gameVersionControl.enable();
      });

    this.mappingTypesService.getMappingTypesBySearchCriteria({})
      .pipe(
        getAllPages(pageIndex => this.mappingTypesService.getMappingTypesBySearchCriteria({page: pageIndex}))
      )
      .subscribe(mappingTypes => {
        this.mappingTypes = mappingTypes;
        this.mappingTypeControl.enable();
      });
  }

  ngAfterViewInit() {
    const debouncedSearchValues = this.searchControl.valueChanges.pipe(
      startWith(String(this.searchControl.value)),
      debounceTime(300),
      map(v => String(v).trim()),
      distinctUntilChanged(),
      shareReplay(1)
    );

    debouncedSearchValues.subscribe(() => {
      this.matPaginator.pageIndex = 0;
    });

    combineLatest([
      this.selectionFormGroup.valueChanges.pipe(
        map(value => ({
          gameVersion: value.gameVersion as GameVersion | null,
          mappingType: value.mappingType as MappingType | null
        }))
      ),
      this.sortChanged.pipe(
        startWith(undefined),
        map(() => ({
          active: this.matSort.active,
          direction: this.matSort.direction
        }))
      ),
      merge(debouncedSearchValues, this.pageChanged).pipe(
        startWith(undefined),
        map(() => ({
          pageIndex: this.matPaginator.pageIndex,
          pageSize: this.matPaginator.pageSize
        })),
      ),
      debouncedSearchValues
    ]).pipe(
      filter(([{gameVersion, mappingType}]) => {
        return gameVersion != null && mappingType != null;
      }),
      distinctUntilChanged((a, b) => fastDeepEqual(a, b)),
      switchMap(([{gameVersion, mappingType}, {active, direction}, {pageSize, pageIndex}, searchValue]) => {
        const sort = active ? [`${active},${direction}`] : undefined;
        this.mappingsLoading = true;
        return this.mappingsService.getMappingsBySearchCriteria(
          {
            mappableType: MappableType.CLASS,
            mappingTypeId: mappingType?.id,
            gameVersionId: gameVersion?.id,
            outputRegex: searchValue === '' ? undefined : '(?i)' + quoteRegex(searchValue),
            page: pageIndex,
            size: pageSize,
            sort: sort
          }
        );
      })
    ).subscribe(page => {
      if (page.content != null) {
        const start = (page.number ?? 0) * (page.size ?? 0);
        const end = start + (page.size ?? 0);
        this.mappings = page.content.slice(start, end);
      } else {
        this.mappings = [];
      }
      this.mappingsTotalCount = page.totalElements ?? 0;
      this.mappingsLoading = false;
      this.searchControl.enable();
    });
  }

  get matPaginatorDisabled(): boolean {
    return this.selectionFormGroup.invalid;
  }

  search(value: string) {
    // TODO error handling

  }
}
