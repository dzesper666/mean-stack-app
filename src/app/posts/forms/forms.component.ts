import { Component } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from "@angular/forms";

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.css']
})
export class FormsComponent {

    constructor(private fb: FormBuilder) { }

    profileForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        address: this.fb.group({
            street: [''],
            city: [''],
            state: [''],
            zip: ['']
        }),
        aliases: this.fb.array([
            this.fb.control('')
        ])
    });

    get aliases() {
        return this.profileForm.get('aliases') as FormArray;
    }

    addAlias() {
        this.aliases.push(this.fb.control(''));
    }

    onSubmit() {
        // TODO: Use EventEmitter with form value
        console.log(this.profileForm.value);
    }

    updateProfile() {
        this.profileForm.patchValue({
            firstName: 'Nancy',
            address: {
                street: '123 Drew Street'
            }
        });
    }

}
