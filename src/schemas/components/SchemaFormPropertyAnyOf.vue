<template>
  <keep-alive>
    <SchemaFormProperty :key="selectedPropertyIndexValue" v-model:value="value" v-bind="{ property, required, errors }" class="schema-form-property-any-of-input">
      <p-button-group v-model="selectedPropertyIndex" :options="options" small class="mb-2" />
    </SchemaFormProperty>
  </keep-alive>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@kozmoai/nebula-design'
  import merge from 'lodash.merge'
  import { computed, reactive, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import SchemaFormProperty from '@/schemas/components/SchemaFormProperty.vue'
  import { useSchema } from '@/schemas/compositions/useSchema'
  import { SchemaProperty, isPropertyWith } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { getSchemaDefinition } from '@/schemas/utilities/definitions'
  import { getInitialIndexForSchemaPropertyAnyOfValue, getSchemaPropertyLabel } from '@/schemas/utilities/properties'
  import { Require } from '@/types/utilities'

  const props = defineProps<{
    property: Require<SchemaProperty, 'anyOf'>,
    value: SchemaValue,
    required: boolean,
    errors: SchemaValueError[],
  }>()

  const api = useWorkspaceApi()
  const schema = useSchema()
  const propertyValues = reactive<SchemaValue[]>([])

  const initialSelectedPropertyIndex = await getInitialIndexForSchemaPropertyAnyOfValue({
    schema,
    property: props.property,
    value: props.value,
    api,
  })

  // need to make sure we set the initial value for the selected property
  // reactivity is handled by the computed value
  // eslint-disable-next-line vue/no-setup-props-destructure
  propertyValues[initialSelectedPropertyIndex] = props.value

  if (initialSelectedPropertyIndex === -1) {
    throw 'not implemented'
  }

  const selectedPropertyIndexValue = ref(initialSelectedPropertyIndex)

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  const value = computed({
    get() {
      return propertyValues[selectedPropertyIndex.value]
    },
    set(value) {
      propertyValues[selectedPropertyIndex.value] = value
      emit('update:value', value)
    },
  })

  const selectedPropertyIndex = computed({
    get() {
      return selectedPropertyIndexValue.value
    },
    set(index) {
      selectedPropertyIndexValue.value = index
      emit('update:value', propertyValues[index])
    },
  })

  const property = computed(() => {
    const selectedProperty = props.property.anyOf[selectedPropertyIndex.value]

    if (isPropertyWith(selectedProperty, '$ref')) {
      return merge({}, getSchemaDefinition(schema, selectedProperty.$ref), props.property)
    }

    return merge({}, selectedProperty, props.property)
  })

  const options = computed<ButtonGroupOption[]>(() => props.property.anyOf.map((property, index) => ({
    label: getOptionLabelForProperty(property),
    value: index,
  })))

  function getOptionLabelForProperty(property: SchemaProperty): string {
    if (property.$ref) {
      const definition = getSchemaDefinition(schema, property.$ref)

      return getSchemaPropertyLabel(definition)
    }

    return getSchemaPropertyLabel(property)
  }
</script>