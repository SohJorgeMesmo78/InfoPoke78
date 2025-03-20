import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themes = ['dark-theme', 'light-theme'];
  private currentThemeIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.loadTheme();
  }

  private loadTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme && this.themes.includes(savedTheme)) {
        this.currentThemeIndex = this.themes.indexOf(savedTheme);
      }
      this.applyTheme();
    }
  }

  public setTheme(theme: string): void {
    if (this.themes.includes(theme)) {
      this.currentThemeIndex = this.themes.indexOf(theme);
      this.applyTheme();
    }
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const theme = this.themes[this.currentThemeIndex];
      document.documentElement.className = theme;
      localStorage.setItem('theme', theme);
    }
  }

  public getCurrentThemeColor(): string {
    if (isPlatformBrowser(this.platformId)) {
      const rootStyles = getComputedStyle(document.documentElement);
      return rootStyles.getPropertyValue('--primaria').trim() || '#DA9200'; 
    }
    return '#DA9200';
  }

  public toggleTheme(): void {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    this.applyTheme();
  }
  
  public getCurrentTheme(): string {
    return this.themes[this.currentThemeIndex] === 'dark-theme' ? 'Dark' : 'Light';
  }
  
}
