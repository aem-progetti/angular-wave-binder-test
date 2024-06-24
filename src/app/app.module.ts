import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {provideAnimations} from "@angular/platform-browser/animations";

@NgModule({
	imports: [
		HttpClientModule,
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatMenuModule,
		MatExpansionModule,
		MatProgressBarModule,
		FormsModule,
		MatTooltipModule,
		MatSortModule,
		MatCheckboxModule,
		MatListModule,
		MatGridListModule,
		MatSnackBarModule,
		MatCardModule,
		MatSelectModule
	],
	exports: [HttpClientModule,
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatMenuModule,
		MatExpansionModule,
		MatProgressBarModule,
		FormsModule,
		MatTooltipModule,
		MatSortModule,
		MatCheckboxModule,
		MatListModule,
		MatGridListModule,
		MatSnackBarModule,
		MatFormFieldModule,
		MatCardModule,
		MatSelectModule],
	providers: [provideHttpClient(),provideAnimations()]
})
export class AppModule {
}
