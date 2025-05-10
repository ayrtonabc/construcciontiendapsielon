type Props={
    type:"success"|"error",
    message:string
}

export default function Feedback(feedback:Props){
    return(<div className={`mb-4 p-3 rounded-md ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {feedback.message}
      </div>)
}
