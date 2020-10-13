import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    exports: [
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatExpansionModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule
    ]
})
export class AngularMaterialModule {}
