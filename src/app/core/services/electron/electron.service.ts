import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, app } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { CardData } from '../../../shared/models/card-data';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer!: typeof ipcRenderer;
  webFrame!: typeof webFrame;
  childProcess!: typeof childProcess;
  fs!: typeof fs;

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = (window as any).require('electron').ipcRenderer;
      this.webFrame = (window as any).require('electron').webFrame;

      this.fs = (window as any).require('fs');

      this.childProcess = (window as any).require('child_process');
      this.childProcess.exec('node -v', (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout:\n${stdout}`);
      });
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  async getItemData(item: string): Promise<CardData> {
    const description = (await this.ipcRenderer.invoke(
      'getDescription',
      item
    )) as string;
    const shortDescription = (await this.ipcRenderer.invoke(
      'getShortDescription',
      item
    )) as string;
    const imgSrc = (await this.ipcRenderer.invoke('getImage', item)) as string;
    return {
      description,
      shortDescription,
      imgSrc: `data:image/png;base64,${imgSrc}`,
      title: item,
    };
  }

  async readdir(): Promise<string[]> {
    if (this.isElectron) {
      return (await this.ipcRenderer.invoke('readdir')) as string[];
    }
    return [];
  }
}
