<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Async Validations</h1>

    <p class="mb-3">
      An async validation is a validation that needs to be checked in an external service, for example, a backend, that
      could be delayed some time. For example, checking if an email.
    </p>

    <form @submit.prevent="onSubmit" novalidate>
      <div class="mb-3">
        <label for="exampleInputName" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputName"
          v-model="formData.name"
          @blur="validateInput('name')"
        />
        <p v-if="errors.name" class="invalid-feedback d-block">{{ errors.name }}</p>
      </div>

      <div class="mb-3">
        <label for="exampleInputEmail" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail"
          v-model="formData.email"
          @blur="
            () => {
              validateInput('email')
              validateInputAsync('email')
            }
          "
        />
        <p v-if="errors.email" class="invalid-feedback d-block">{{ errors.email }}</p>
      </div>

      <div class="mb-3">
        <label for="exampleInputPassword" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword"
          v-model="formData.password"
          @blur="validateInput('password')"
        />
        <p v-if="errors.password" class="invalid-feedback d-block">{{ errors.password }}</p>
      </div>

      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="exampleCheck"
          v-model="formData.check"
          @blur="validateInput('check')"
        />
        <label class="form-check-label" for="exampleCheck">I accept the Privacy Policy</label>
        <p v-if="errors.check" class="invalid-feedback d-block">{{ errors.check }}</p>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from '@/lib'

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

const { formData, validateForm, validateFormAsync, errors, resetForm, loading, validateInput, validateInputAsync } =
  useForm({
    data: {
      email: '',
      password: '',
      name: '',
      check: false
    },
    validations: {
      email: (value: string) => {
        if (!value) return 'Please enter an email'
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(value)) return 'Please enter a valid email'
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
    },
    asyncValidations: {
      email: async () => {
        // Checking in backend if email already exists
        await sleep(1000)
        if (Math.random() < 0.5) return 'This email is already taken'
      }
    }
  })

const onSubmit = async () => {
  if (!validateForm()) return
  if (!(await validateFormAsync())) return

  loading.value = true

  setTimeout(() => {
    alert(JSON.stringify(formData))
    loading.value = false
    resetForm()
  }, 1000)
}
</script>
