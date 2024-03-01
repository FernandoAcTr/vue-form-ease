<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Using Validators</h1>

    <p class="mb-3">
      The library includes a set of built-in validators that you can use to validate your form fields very easily.
    </p>

    <form @submit.prevent="onSubmit" novalidate>
      <div class="mb-3">
        <label for="exampleInputName" class="form-label">Name</label>
        <input type="text" class="form-control" id="exampleInputName" v-model="formData.name" />
        <p v-if="errors.name" class="invalid-feedback d-block">{{ errors.name }}</p>
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail" v-model="formData.email" />
        <p v-if="errors.email" class="invalid-feedback d-block">{{ errors.email }}</p>
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword" v-model="formData.password" />
        <p v-if="errors.password" class="invalid-feedback d-block">{{ errors.password }}</p>
      </div>

      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck" v-model="formData.check" />
        <label class="form-check-label" for="exampleCheck">I accept the Privacy Policy</label>
        <p v-if="errors.check" class="invalid-feedback d-block">{{ errors.check }}</p>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { string, boolean } from '@/lib'
import { useForm } from '@/lib'

const { formData, validateForm, errors, resetForm, loading } = useForm({
  data: {
    email: '',
    password: '',
    name: '',
    check: false
  },
  validations: {
    email: (value: string) => string(value).required('Please enter an email').email().validate(),
    name: (value: string) => string(value).required('Please enter your name').name().validate(),
    password: (value: string) => string(value).required('Please enter a password').min(4).max(8).validate(),
    check: (value: boolean) =>
      boolean(value)
        .required('Please accept the privacy policies')
        .isTrue('Please accept the privacy policies')
        .validate()
  }
})

const onSubmit = () => {
  if (!validateForm()) return

  loading.value = true

  setTimeout(() => {
    alert(JSON.stringify(formData))
    loading.value = false
    resetForm()
  }, 1000)
}
</script>
