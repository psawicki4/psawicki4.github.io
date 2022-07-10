import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Color} from "./color.interface";
import {TinyColor} from "@ctrl/tinycolor";

@Component({
  selector: 'pw-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsComponent implements OnInit {

  primaryColor: string;
  primaryColorPalette: Color[] = [];

  secondaryColor: string;
  secondaryColorPalette: Color[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initColors();
    this.savePrimaryColor();
    this.saveSecondaryColor();
  }

  initColors() {
    this.primaryColor = localStorage.getItem('primaryColor') ?? '#293d8d';
    this.secondaryColor = localStorage.getItem('secondaryColor') ?? '#d2cb41';
  }

  savePrimaryColor() {
    this.primaryColorPalette = this.computeColors(this.primaryColor);

    this.primaryColorPalette.forEach(color => {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(0, 0, 0, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    });
    localStorage.setItem('primaryColor', this.primaryColor);
  }

  saveSecondaryColor() {
    this.secondaryColorPalette = this.computeColors(this.secondaryColor);

    this.secondaryColorPalette.forEach(color => {
      const key1 = `--theme-secondary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-secondary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(0, 0, 0, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    });
    localStorage.setItem('secondaryColor', this.secondaryColor);
  }

  computeColors(hex: string): Color[] {
    const color = new TinyColor(hex);
    return [
      this.getColorObject(color.lighten(52), '50'),
      this.getColorObject(color.lighten(37), '100'),
      this.getColorObject(color.lighten(26), '200'),
      this.getColorObject(color.lighten(12), '300'),
      this.getColorObject(color.lighten(6), '400'),
      this.getColorObject(color, '500'),
      this.getColorObject(color.darken(6), '600'),
      this.getColorObject(color.darken(12), '700'),
      this.getColorObject(color.darken(18), '800'),
      this.getColorObject(color.darken(24), '900'),
      this.getColorObject(color.lighten(50).saturate(30), 'A100'),
      this.getColorObject(color.lighten(30).saturate(30), 'A200'),
      this.getColorObject(color.lighten(10).saturate(15), 'A400'),
      this.getColorObject(color.lighten(5).saturate(5), 'A700')
    ];
  }

  getColorObject(value: any, name: string): Color {
    const c = new TinyColor(value);
    return {
      name: name,
      hex: c.toHexString(),
      darkContrast: c.isLight()
    };
  }
}
