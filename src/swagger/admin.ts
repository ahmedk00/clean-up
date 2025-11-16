/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin authentication & Previous Work management APIs
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login with email and password
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login successful, returns access & refresh tokens
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/admin/refresh:
 *   post:
 *     summary: Refresh admin access token
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: A new access token is returned
 *       401:
 *         description: Refresh token invalid or expired
 */

/**
 * @swagger
 * /api/admin/profile:
 *   get:
 *     summary: Get admin profile (Protected)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns admin profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

/**
 * @swagger
 * /api/admin/previous-work:
 *   post:
 *     summary: Create a new previous work entry (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *                 example: Kitchen Renovation
 *               description:
 *                 type: string
 *                 example: Full renovation with modern theme
 *               category:
 *                 type: string
 *                 example: Cleaning
 *               featured:
 *                 type: boolean
 *                 example: false
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Previous work created successfully
 *       400:
 *         description: Validation error or missing image
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/admin/previous-work/{id}:
 *   put:
 *     summary: Update previous work entry (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Previous work ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               featured:
 *                 type: boolean
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Previous work updated successfully
 *       404:
 *         description: Previous work not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/admin/previous-work/{id}:
 *   delete:
 *     summary: Delete a previous work entry (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Previous work ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Previous work not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/admin/previous-work/{id}/toggle-featured:
 *   patch:
 *     summary: Toggle featured status for a previous work item (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Previous work ID
 *     responses:
 *       200:
 *         description: Featured status updated
 *       404:
 *         description: Previous work not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/admin/previous-work/{id}/image:
 *   delete:
 *     summary: Delete a specific image from previous work (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Previous work ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageUrl
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: https://res.cloudinary.com/.../image1.jpg
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       400:
 *         description: Cannot delete last image
 *       404:
 *         description: Work or image not found
 *       401:
 *         description: Unauthorized
 */
