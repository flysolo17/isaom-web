import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  items = [
    { label: 'Home', icon: 'pi pi-fw pi-home' },
    { label: 'About', icon: 'pi pi-fw pi-info' },
    { label: 'Services', icon: 'pi pi-fw pi-cog' },
    { label: 'Contact', icon: 'pi pi-fw pi-envelope' },
  ];
}
