import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChevronIconComponent } from "./icons/chevron-icon/chevron-icon.component";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { DownloadIconComponent } from "./icons/download-icon/download-icon.component";
import { UploadIconComponent } from "./icons/upload-icon/upload-icon.component";
import { DropdownComponent } from "./dropdown/dropdown.component";

@NgModule({
  declarations: [
    ChevronIconComponent,
    DownloadIconComponent,
    UploadIconComponent,
    ProgressBarComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ChevronIconComponent,
    ProgressBarComponent,
    DownloadIconComponent,
    UploadIconComponent,
    DropdownComponent
  ]
})
export class SharedModule {
}
