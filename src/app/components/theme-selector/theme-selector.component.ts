import {Component} from '@angular/core';
import {AppTheme, ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent {

  constructor(private readonly themeService: ThemeService) {
  }

  setTheme(theme: AppTheme) {
    this.themeService.setTheme(theme);
  }

}
