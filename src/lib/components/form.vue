<template>
  <form @submit.prevent="submit" novalidate>
    <slot />
  </form>
</template>

<script setup lang="ts">
import { useForm } from '../composables/useForm'

const props = defineProps<{
  resetAfterSubmit?: boolean
  form: Partial<ReturnType<typeof useForm>>
  onSubmit: () => Promise<void>
}>()

const submit = async (event: Event) => {
  event.preventDefault()

  if (props.form.validateForm && !props.form.validateForm()) return
  if (props.form.validateFormAsync && !(await props.form.validateFormAsync())) return

  await props.onSubmit?.()

  if (props.resetAfterSubmit && props.form.resetForm) props.form.resetForm()
}
</script>
