import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";
import { NovidadesService } from '../../services/novidades.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-novidades',
    standalone: true,
    templateUrl: './novidades.component.html',
    styleUrls: ['./novidades.component.scss'],
    imports: [BtnPrimaryComponent, ReactiveFormsModule, CommonModule]
})
export class NovidadesComponent implements OnInit {
    novidadesForm!: FormGroup;
    loading = signal(false);

    constructor(private service: NovidadesService) {
        this.novidadesForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    ngOnInit() {}

    onSubmit() {
        this.loading.set(true);
        if (this.novidadesForm.valid) {
            const { name, email } = this.novidadesForm.value;
            this.service.sendNovidade({ name, email }).subscribe({
                next: () => {
                    this.novidadesForm.reset();
                    this.loading.set(false);
                },
                error: () => this.loading.set(false)
            });
        }
    }
}
