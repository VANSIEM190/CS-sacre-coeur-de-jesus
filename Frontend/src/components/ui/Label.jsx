import * as LabelPrimitive from '@radix-ui/react-label'

function Label({ ...props }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className="block text-sm font-medium text-gray-700 mb-2"
      {...props}
    />
  )
}

export { Label }
