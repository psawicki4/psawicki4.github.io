import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as tinycolor from "tinycolor2";
import {Color} from "./color";

@Component({
  selector: 'pw-application-colors',
  templateUrl: './application-colors.component.html',
  styleUrls: ['./application-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationColorsComponent implements OnInit {

  primaryColor = '#293d8d';
  primaryColorPalette: Color[] = [];

  secondaryColor = '#d2cb41';
  secondaryColorPalette: Color[] = [];

  constructor() { }

  ngOnInit(): void {
    this.savePrimaryColor();
    this.saveSecondaryColor();
  }

  savePrimaryColor() {
    console.log(this.primaryColor);
    this.primaryColorPalette = this.computeColors(this.primaryColor);

    for (const color of this.primaryColorPalette) {
      const key1 = `--theme-primary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-primary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  saveSecondaryColor() {
    this.secondaryColorPalette = this.computeColors(this.secondaryColor);

    for (const color of this.secondaryColorPalette) {
      const key1 = `--theme-secondary-${color.name}`;
      const value1 = color.hex;
      const key2 = `--theme-secondary-contrast-${color.name}`;
      const value2 = color.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key1, value1);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  computeColors(hex: string): Color[] {
    return [
      this.getColorObject(tinycolor(hex).lighten(52), '50'),
      this.getColorObject(tinycolor(hex).lighten(37), '100'),
      this.getColorObject(tinycolor(hex).lighten(26), '200'),
      this.getColorObject(tinycolor(hex).lighten(12), '300'),
      this.getColorObject(tinycolor(hex).lighten(6), '400'),
      this.getColorObject(tinycolor(hex), '500'),
      this.getColorObject(tinycolor(hex).darken(6), '600'),
      this.getColorObject(tinycolor(hex).darken(12), '700'),
      this.getColorObject(tinycolor(hex).darken(18), '800'),
      this.getColorObject(tinycolor(hex).darken(24), '900'),
      this.getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
      this.getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
      this.getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
      this.getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
    ];
  }

  getColorObject(value: any, name: string): Color {
    const c = tinycolor(value);
    return {
      name: name,
      hex: c.toHexString(),
      darkContrast: c.isLight()
    };
  }
}
