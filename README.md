# Frontend Developer Homework Assignment

## Objective:

You will be working with an existing form builder. The builder provides a possibility to choose one of several field types, set a key, a label, and add it into a form. Your task is divided into two main parts.

## Task Details:

### 1. Field Input Validation:

In the existing application, we need to add validation to each input field according to its assigned type. For instance, if a field's type is ParamType.Number, the system should not allow the input of any non-numeric characters or symbols. Conversely, if the type is ParamType.String, any character input should be acceptable.

If a user attempts to input data that does not conform to the field's type, your solution should trigger an error function that displays an appropriate message. Validation should be triggered upon the blur event on each field.

### 2. Dynamic Validation Setting:

In addition to basic field type validation, we need a feature that allows additional, user-defined validation rules to be set directly through the interface. This functionality should allow for rules such as:

- The entered value must be greater than or equal to 5.
- The input must begin with a capital letter.
- The input must match a specific pattern (e.g., an email format).
- The input must not contain any special characters.
- The input must be a valid date. 

The interface should allow for the definition of these and other validation rules, without requiring modifications to the codebase for each new rule. The specifics of how you enable this dynamic rule-setting are up to you, but we're looking for an innovative, flexible, and scalable solution.

## Code Implementation:

### 1. Steps to run the project:

- Use `npm i` to install dependencies.
- Then use `npm run dev` to start dev server.
- To run the unit tests, use `npm run test`.
- To get coverage report, use `npm run coverage`.

### 2. Thoughts and insights:

- The implementation has required validations for following field types. (boolean is skipped because it has only one value)
  - number
  - string
  - date
- Users can add required validations and check the validation message if the field is empty.
- The implementation has multiple validation rules input functionality. So the user can add multiple conditions to the input fields.
- Users have to add following field to create validation rule.
  - Validation rule name
  - Validation type
  - Value / regex
  - Validation message
#### String type
- Using the **string** type, user can enter regex as an input. So the following criteria will be covered using suitable regular expressions.
  - The input must begin with a capital letter.
  - The input must match a specific pattern (e.g., an email format).
  - The input must not contain any special characters.
  - The input must be a valid date.
- Users can check the string length validations with regex, Eg - 10 characters only `/^[a-z]{0,10}$/`
- Users can check multiple regex values with multiple validation rules. Eg - Users can check string contains alphabet characters `/^[a-zA-Z]+$/` and vowels `/^[aeiou]$/` with 2 different regex values.
- If the 2 regex values conflicts, user will not get the correct result.

#### Number type
- Using the **number** type, user can do following operations.
  - Greater Than **( > )**
  - Greater Than Or Equal **( >= )**
  - Less Than **( < )**
  - Less Than Or Equal **( <= )**
  - Equal **( == )**
- So the following criteria will be covered using suitable operations.
  - The entered value must be greater than or equal to 5.
- Users can perform range operation with multiple validation rules. Eg - Value should be greater than 5 and value should be less than 10. (5 - 10 range)
- Users can add multiple conditions with multiple validation rules. Eg - Value should be greater than 10 and value should be 20.
#### Date type
- Using the **date** type, user can do following operations.
  - Greater Than **( > )**
  - Greater Than Or Equal **( >= )**
  - Less Than **( < )**
  - Less Than Or Equal **( <= )**
  - Equal **( == )**
- Users can check above mentioned comparison with another date.
- mui date string is considered as the input. So users cannot change the date format in the form.
- Users can add multiple conditions with multiple validation rules. Eg - Date should be greater than 08/01/2023 and date should be 08/10/2023.
- Users can perform date range operation with multiple validation rules. Eg - Date should be greater than 08/01/2023 and date should be less than 08/10/2023. (08/01/2023 - 08/10/2023 range)
