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

  // eslint-disable-next-line vue/no-mutating-props
  if (props.form.loading != null) props.form.loading.value = true

  await props.onSubmit?.()

  // eslint-disable-next-line vue/no-mutating-props
  if (props.form.loading != null) props.form.loading.value = false
  if (props.resetAfterSubmit && props.form.resetForm) props.form.resetForm()
}
</script>
