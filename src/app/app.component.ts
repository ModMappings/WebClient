import {Component, OnInit} from '@angular/core';
import {AppTheme, ThemeService} from "./services/theme.service";

const themeToClassMap: Record<AppTheme, string | null> = {
  light: null,
  dark: 'app-dark-theme'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'MCMS';

  private currentTheme: AppTheme | null = null;

  constructor(private readonly themeService: ThemeService) {
  }

  private static unapplyTheme(theme: AppTheme) {
    const className = themeToClassMap[theme];
    if (className != null) {
      document.documentElement.classList.remove(className);
    }
  }

  private static applyTheme(theme: AppTheme) {
    const className = themeToClassMap[theme];
    if (className != null) {
      document.documentElement.classList.add(className);
    }
  }

  ngOnInit(): void {
    this.themeService.theme.subscribe(nextTheme => {
      if (this.currentTheme != null) {
        AppComponent.unapplyTheme(this.currentTheme);
      }
      this.currentTheme = nextTheme;
      AppComponent.applyTheme(nextTheme);
    });
  }

  setTheme(theme: AppTheme) {
    this.themeService.setTheme(theme);
  }

}
