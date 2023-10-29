import { Injectable } from '@angular/core';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { Item, ipcRenderer, webFrame } from 'electron';
import { ItemData } from '../../../shared/models/item-data';
import { MenuData } from '../../../shared/models/menu-data';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer!: typeof ipcRenderer;
  webFrame!: typeof webFrame;
  childProcess!: typeof childProcess;

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = (window as any).require('electron').ipcRenderer;
      this.webFrame = (window as any).require('electron').webFrame;

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
      });
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  async readUTFFile(relativePath: string): Promise<string> {
    return (await this.ipcRenderer.invoke(
      'readUTFFile',
      relativePath
    )) as string;
  }

  async readBase64File(relativePath: string): Promise<string> {
    return (await this.ipcRenderer.invoke(
      'readBase64File',
      relativePath
    )) as string;
  }

  async initExpoData(): Promise<ItemData[]> {
    return (await this.ipcRenderer.invoke('initExpoData')) as ItemData[];
  }
}
