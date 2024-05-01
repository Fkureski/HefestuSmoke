import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovidadesService } from '../../services/novidades.service';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-novidades',
    standalone: true,
    templateUrl: './novidades.component.html',
    styleUrl: './novidades.component.scss',
    imports: [BtnPrimaryComponent, ReactiveFormsModule]
})
export class NovidadesComponent {
    novidadesForm!: FormGroup;
    loading = signal(false);

    constructor(private service: NovidadesService) {
        this.novidadesForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    onSubmit() {
        this.loading.set(true);
        if (this.novidadesForm.valid) {
            this.service.sendData(this.novidadesForm.value.name, this.novidadesForm.value.email).subscribe({
                next: () => {
                    this.novidadesForm.reset();
                    this.loading.set(false);
                },
                error: () => this.loading.set(false)
            })
        }
    }

}
