interface Props {
    name: string;
    label: any;
    handleChange: any;
    handleShowPassword?: any;
    type?: string;
}

const Input = ({name, label, handleChange, handleShowPassword, type}: Props) => {
  return (
    <div className="bg-gray-900">
        <input name={name} onChange={handleChange} placeholder={label} type={type} className='px-2 rounded-lg w-full bg-gray-700 shadow-lg'/>
    </div>
  )
}

export default Input