<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Basic Usage</h1>

    <p class="mb-3">
      This is the simplest way to use this library. You can use the <code>createForm</code> function to get a bunch of
      utilities to manage your form. You can use the <code>formData</code> ref to get the current value of the form, the
      <code>validateForm</code> function to validate the form, the <code>errors</code> ref to get the current errors of
      the form, the <code>resetForm</code> function to reset the form, and the <code>loading</code> ref to manage the
      loading state of the form.
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
      <button type="button" class="btn btn-primary" @click="reset">Reset</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/lib'

const { formData, validateForm, errors, resetForm, loading } = useForm({
  data: {
    email: '',
    password: '',
    name: '',
    check: false
  },
  validations: {
    email: (value: string) => {
      if (!value) return 'Please enter an email'
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Please enter a valid email'
    },
    name: (value: string) => {
      if (!value) return 'Please enter your name'
    },
    password: (value: string) => {
      if (!value) return 'Please enter a password'
    },
    check: (value: boolean) => {
      if (!value) return 'Please accept the privacy policies'
    }
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

const reset = () => {
  resetForm()
}
</script>
