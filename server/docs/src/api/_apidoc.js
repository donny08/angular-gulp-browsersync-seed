
/**
 * @api {get} users/:platform_id/:search?/:offset?/:limit? Get Platform Users
 * @apiName GET_USERS
 * @apiDescription Get user list for the specified platform
 * @apiGroup USERS
 *
 * @apiParam {string} platform_id Platform ID of sms/ voice / aawaz / email
 * @apiParam {string} [search] A regex key to look for username. (use _ to search all)
 * @apiParam {Number} [offset] Skip the number of records
 * @apiParam {Number} [limit=50] Limit of records in the JSON. [Max: 1000]
 *
 * @apiExample {js} Example 1
 *      URL: http://<ip>:<port>/users/aawazlive
 * @apiExample {js} Example 2
 *      URL: http://<ip>:<port>/users/aawazlive/netcore
 * @apiExample {js} Example 3
 *      URL: http://<ip>:<port>/users/aawazlive/_/0/100
 *
 * @apiSuccess {JSON} body A JSON object with platform user details
 *
 * @apiSuccessExample Success
 *  HTTP Status 200 OK
 *  {
 *   "code": 200,
 *   "msg": "success",
 *   "data": {
 *       "username": 'netcore',
 *       "userid": 1212
 *   }
 * }
 * @apiSuccessExample Failed
 *  HTTP Status 500 Error
 *  {
 *   "code": 500,
 *   "msg": "error",
 *   "data": null
 *  }
 *
 */



/**
 * @api {post} users/add Creates Platform user
 * @apiName ADD_USER
 * @apiDescription Add a new user for the specified platform with specified user details.
 * @apiGroup USERS
 *
 * @apiParam {string} platform_id Platform ID of sms/ voice / aawaz / email
 * @apiParam {string} cid Customer ID from the CRM
 * @apiParam {string} wid Project / Work id from the CRM
 *
 *
 * @apiSuccess {JSON} body A JSON object with platform user details
 *
 * @apiSuccessExample Success
 *  HTTP Status 200 OK
 *  {
 *   "code": 200,
 *   "msg": "success",
 *   "data": {
 *       "username": 'netcore',
 *       "sid": '<tbd>'
 *       "userid": 1212
 *   }
 * }
 * @apiSuccessExample Failed
 *  HTTP Status 500 Error
 *  {
 *   "code": 500,
 *   "msg": "error",
 *   "data": null
 *  }
 *
 */


/**
 * @api {post} users/link Links Platform User
 * @apiName LINK_USER
 * @apiDescription Links an existing platform user account with the CRM account
 * @apiGroup USERS
 *
 * @apiParam {string} platform_id Platform ID of sms/ voice / aawaz / email
 * @apiParam {string} username Username retrieved from the Get users API.
 * @apiParam {string} cid Customer ID from the CRM
 * @apiParam {string} wid Project / Work id from the CRM
 *
 *
 * @apiSuccess {JSON} body A JSON object with platform user details
 *
 * @apiSuccessExample Success
 *  HTTP Status 200 OK
 *  {
 *   "code": 200,
 *   "msg": "success",
 *   "data": {
 *       "username": 'netcore',
 *       "sid": '<tbd>'
 *       "userid": 1212
 *   }
 * }
 * @apiSuccessExample Failed
 *  HTTP Status 500 Error
 *  {
 *   "code": 500,
 *   "msg": "error",
 *   "data": null
 *  }
 *
 */

